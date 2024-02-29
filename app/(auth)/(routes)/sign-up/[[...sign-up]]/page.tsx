import { SignUp } from "@clerk/nextjs";
import image from '@/public/images/cta-glow.fc896890.png'
import Image from "next/image";

export default function Page() {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            <div className={`w-full h-full absolute m-0 p-0`}>
                <Image
                    src={image}
                    alt="image"
                    layout="fill"
                    objectFit="cover"
                    className="backdrop-blur-sm"
                    placeholder="blur"
                />
            </div>
            <div className="z-50">
                <SignUp afterSignUpUrl={'/dashboard'} />
            </div>
        </div>
    );
}