import React from 'react'

const HeaderCredits = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <>
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-[#864AF9]">{title}</h2>
            {
                subtitle && <p className="font-normal text-[16px] leading-[140%] text-muted-foregroundk mt-4">{subtitle}</p>
            }
        </>
    )
}

export default HeaderCredits