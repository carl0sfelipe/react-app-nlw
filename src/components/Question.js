import '.././styles/question.scss';
//import {ReactNode} from 'react'
import cx from 'classnames'

export function Question({
    isAnswered = false,
    isHighlighted = false,
    ...props}){
return(
<div  className={cx(
    'question',
    {answered: isAnswered},
    { highlighted: isHighlighted && !isAnswered}
    )}>
<p>
    {props.content}
</p>
<footer>
    <div className='user-info'>
<img src={props.author.avatar} alt={props.author.name}/>
<span >{props.author.name}</span>
    </div>
    <div>
        {props.children}
    </div>
</footer>
</div>
)

}