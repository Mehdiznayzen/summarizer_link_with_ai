import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion : '2024-04-10'
})

const endPointSecret = 'whsec_6f7a62b60a25475f52a109464f51b7f20c4a6e3ade2fc65f3909df2d5cf37d7b'

const fulFillOrder = async (data: Stripe.LineItem[], customerEmail: any) => {
    try {
        const email = customerEmail.toLowerCase()

        if (email) {
            const result = await axios.post('http://localhost:8000/api/customers', {
                email : email
            })
            if(result) return true
        } else {
            console.log('Customer email not available.');
            return false
        }
    } catch (error) {
        console.error(error)
        return false;
    }
}

const handleCompeletdCheckoutSession = async (event: Stripe.CheckoutSessionCompletedEvent) => {
    try {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            (event.data.object as any).id,
            {
                expand : ['line_items']
            }
        );
        const lineItems = sessionWithLineItems.line_items

        if(!lineItems) return false

        const ordersFulFilled = await fulFillOrder(
            lineItems.data,
            event.data.object.customer_details?.email
        );

        if(ordersFulFilled) return true

        console.log(
            'error fulfilling orders for',
            JSON.stringify(lineItems),
            JSON.stringify(event.data.object)
        )
        return false;

    } catch (error: any) {
        console.error('Error handling Compeletd Checkout Session : ', error)
        console.log(error.message)
    }
}

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event;
    try {
        if (!endPointSecret) {
            console.log('Endpoint secret not provided.');
        }
        event = stripe.webhooks.constructEvent(rawBody, sig!, endPointSecret!);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const savedSession = await handleCompeletdCheckoutSession(event);

            try {
                if (!savedSession) {
                    return NextResponse.json({ error: 'Unable to save checkout session' }, { status: 500 });
                }
            } catch (error) {
                console.error('Error retrieving Payment Intent:', error);
                return NextResponse.json({ error: 'Error retrieving Payment Intent' }, { status: 500 });
            }
            break;
        default:
            console.warn(`Unhandled event type ${event.type}`);
            return NextResponse.json({ received: true, status: true });
    }

    return NextResponse.json({ received: true, status: true });
}
