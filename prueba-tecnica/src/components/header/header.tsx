export function Header({text}: {text: string}) {
    return (
        <header>
         <span className="bg-primary">{text}</span>
        </header>
    )
}
