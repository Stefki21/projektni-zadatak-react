import './Button.css'

function Button (props) {
    return (
        <button type={props.type ? props.type : 'button'} className={props.className} onClick={props.onClick}>{props.children}</button>
    )
}

export default Button;