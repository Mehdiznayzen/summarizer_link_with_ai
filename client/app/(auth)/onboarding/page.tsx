import AccountForm from '@/components/shared/AccountForm';
import { fetchUser } from '@/lib/actions/fetchUser.action';
import { cn } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs';
import { Dancing_Script } from 'next/font/google'
import { redirect } from 'next/navigation';

const font = Dancing_Script({
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});


const onBoardingPage = async () => {
    const user = await currentUser()
    if(!user) return null;

    // check if user exists or not
    const userExist = await fetchUser(user?.id)
    if(userExist.length > 0) return redirect('/')

    const userData = {
        id: user.id,
        username: user.username,
        email : user.emailAddresses[0].emailAddress,
        bio: "",
        image: user.imageUrl,
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center gap-[20px] onboarding_container p-3">
            <h1 className={cn('text-[46px]', font.className)}>Onboarding</h1>
            <p className='mt-3 text-[23px] font-semibold text-muted-foreground'>
                Complete your profile now, to use Imaginify.
            </p>

            <div className="w-[900px] border-2 border-dashed flex justify-center p-3 rounded-lg">
                <AccountForm 
                    userData = {userData}
                />
            </div>
        </section>
    )
}

export default onBoardingPage