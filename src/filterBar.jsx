export default function Bar({selects, isVisible, onExeclude}){
    let eles = selects.map(select=>{
        return <Selects select={select} onExeclude={onExeclude}/>
    })
    return(
        <div className={"filterOptions " + (isVisible?"visible":"hidden")}>
            {eles}
        </div>
    )
}
function Selects({select, onExeclude}){
    return(
        <span className='filterOption'>
            <p>{select}</p>
            <span data-info={select} onClick={e=>onExeclude(e)}>
              <img src="./images/icon-remove.svg" />
            </span>
        </span>
    )
}