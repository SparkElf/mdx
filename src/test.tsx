interface BriefProps {
    text: string
}
//文章的简介
export const Brief = function ({ text }: BriefProps) {
    return <p className="brief">{text}</p>
}