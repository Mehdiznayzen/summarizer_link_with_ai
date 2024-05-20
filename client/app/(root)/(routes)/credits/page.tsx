'use client'

import HeaderCredits from '@/components/shared/HeaderCredits'
import { Button } from '@/components/ui/button'
import { plans } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Credits = () => {
    const router = useRouter()

    return (
        <section className="credits_container">
            <HeaderCredits
                title="Buy Credits"
                subtitle="Choose a credit package that suits your needs!"
            />
            <div>
                <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9">
                    {
                        plans.map((plan) => (
                            <li 
                                key={plan.name} 
                                className="w-full rounded-[16px] border-2 border-purple-200/20 bg-white p-8 shadow-xl shadow-purple-200/20 lg:max-w-none"
                            >
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <Image
                                        src={plan.icon} 
                                        alt="check" 
                                        width={50} 
                                        height={50} 
                                    />
                                    <p className="font-semibold text-[20px] leading-[140%] mt-2 text-purple-500">
                                        {plan.name}
                                    </p>
                                    <p className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] text-black">${plan.price}</p>
                                </div>

                                {/* Inclusions */}
                                <ul className="flex flex-col items-center justify-center gap-5 py-9">
                                    {
                                        plan.inclusions.map((inclusion) => (
                                            <li
                                                key={plan.name + inclusion.label}
                                                className="flex items-center gap-4"
                                            >
                                                <Image
                                                    src={`/icons/${
                                                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                                                    }`}
                                                    alt="check"
                                                    width={24}
                                                    height={24}
                                                />
                                                <p className="font-normal text-[16px] leading-[140%]">{inclusion.label}</p>
                                            </li>
                                        ))
                                    }
                                </ul>

                                {
                                    plan.name === "Free" ? (
                                        <Button
                                            variant="purple" 
                                            onClick={() => {
                                                router.push('/imaginify')
                                            }}
                                            className='w-full rounded-full bg-purple-100 bg-cover text-purple-500 hover:text-purple-500'
                                        >
                                            Free Consumable
                                        </Button>
                                    ) : (
                                        <Link
                                            href={'https://buy.stripe.com/test_7sIg0D7bV8EU5P27ss'}
                                        >
                                            <Button
                                                variant="purple"
                                                className='w-full rounded-full bg-purple-600 bg-cover text-white'
                                            >
                                                Buy Credit
                                            </Button>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default Credits