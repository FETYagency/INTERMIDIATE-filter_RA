import { useEffect, useRef, useState } from "react"

export default function Jobs({jobsData, onShow, onFilter, trigger}){
    let jobsList = jobsData.map(jobData=>{
        return <Job jobData={jobData} onShow={onShow} onFilter={onFilter} trigger={trigger}/>
    })
    return(
        <ul className="jobs">
            {jobsList}
        </ul>
    )
    
}


function Job({jobData, onShow, onFilter, trigger}){
    const targetRef = useRef(null)
    const [isIntersecting, setIsIntersecting] = useState(false);
    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    entry.target.classList.remove("out")
                    entry.target.classList.add("in")
                } else {
                    setIsIntersecting(false);
                    entry.target.classList.remove("in")
                    entry.target.classList.add("out")
                }
            })
        },{
            threshold:.5,
        })
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
    },trigger)
    return(
        <li className={"job " + (jobData.new?"true":"false")} key={jobData.id} ref={targetRef}> 
            <Img path={jobData.logo}/>
            <Details 
                companyName={jobData.company}
                isNew={jobData.new}
                isFeatured={jobData.featured}
                jobTitle={jobData.position}
                postedAt={jobData.postedAt}
                contract={jobData.contract}
                location={jobData.location}
            />
            <Options
                role={jobData.role}
                level={jobData.level}
                languages={jobData.languages}
                tools={jobData.tools}
                onShow={onShow}
                onFilter={onFilter}
            />
        </li>
    )
}


function Img({path}){
    return(
        <div className="img">
            <img src={path}/>
        </div>
    )
}
function Details({
    companyName,
    isNew,
    isFeatured,
    jobTitle,
    postedAt,
    contract,
    location
}){

    return(
        <div className="details">

            <div className="detailsHeader">
                <h2 className="companyName">{companyName}</h2>
                <span className={"isNew " + (isNew?"true":"false")}>NEW!</span>
                <span className={"isFeatured " + (isFeatured?"true":"false")}>FEATURED</span>
            </div>

            <h2 className="jobName">{jobTitle}</h2>
            
            <div className="jobType">
                <p>{postedAt}</p>
                <span className='circle'></span>
                <p>{contract}</p>
                <span className='circle'></span>
                <p>{location}</p>
              </div>

        </div>
    )

}

function Options({
    role,
    level,
    languages,
    tools,
    onShow,
    onFilter
}){
    let jobRole = Boolean(role)
    ?(  <span className="option" onClick={(e)=>{
        onShow()
        onFilter(e)
        }}>
            {role}
        </span>)
    :Boolean(role)

    let jobLevel = Boolean(level)
    ?(  <span className="option" onClick={(e)=>{
        onShow()
        onFilter(e)
    }}>
            {level}
        </span>)
    :Boolean(level)

    let jobLanguages = languages.map(language=>{
        return(
            <span className="option" onClick={(e)=>{
                onShow()
                onFilter(e)
            }}>
                {language}
            </span>
        )
    })

    let jobTools = tools.map(tool=>{
        return(
            <span className="option" onClick={(e)=>{
                onShow()
                onFilter(e)
            }}>
                {tool}
            </span>
        )
    })

    return(
        <div className="options">
            {jobRole}
            {jobLevel}
            {jobLanguages}
            {jobTools}
        </div>
    )
}