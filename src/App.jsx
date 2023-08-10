import { useState, useEffect } from 'react'
import Jobs from "./jobLists";
import Bar from "./filterBar"


let initialList;

function App() {
  let [jobs, setJobs]= useState(null)
  let [barVisiblity, sestBarVisibility] = useState(false)
  let [filter, setFilter] = useState([])
  
  let req = new Request("https://api.jsonbin.io/v3/b/649984b39d312622a375db0a")

  function handleBarVisibility(){
    sestBarVisibility(true)
  }

  function handleFilters(e){
    let newFilters = [
      ...filter,
      e.target.textContent
    ]
    if(!filter.some(ele=>ele===e.target.textContent)){
      setFilter(newFilters)
    }
    let newList = jobs.map(job=>{
      let array = [...job.languages, ...job.tools, job.level, job.role]
      const isSubset = (array1, array2) =>array2.every((element) => array1.includes(element));
      if(isSubset(array,newFilters)){
        return job
      }
    })
    setJobs(newList.filter(ele=>ele!==undefined))
  }

  function handleExeclude(e){
    let newFilters = filter.filter(ele=>ele!==e.currentTarget.dataset.info)
    setFilter(newFilters)
    setJobs(false)
    
    fetch(req)
    .then(resp=>{
      return resp.json()
    })
    .then(data=>{
      let e = data.record
      let newList = e.map(job=>{
        let array = [...job.languages, ...job.tools, job.level, job.role]
        const isSubset = (array1, array2) =>array2.every((element) => array1.includes(element));
        if(isSubset(array,newFilters)){
          return job
        }
      })
      setJobs(newList.filter(ele=>ele!==undefined))
    })

    if(filter.length===1){
      sestBarVisibility(false)
    }
  }
  
  
  useEffect(
    ()=>{
      fetch(req)
      .then(resp=>{
        return resp.json()
      })
      .then(data=>{
        initialList=data.record;
        setJobs(data.record)
      })
    },[])

  return (
    <>
      <div className='pattern'>
        <picture>
          <source media="(min-width: 900px)" srcset="./images/bg-header-desktop.svg"/>
          <img src="./images/bg-header-mobile.svg"/>
        </picture>
      </div>

      <main>

        <Bar selects={filter} isVisible={barVisiblity} onExeclude={handleExeclude}/>

        {jobs  
          ?<Jobs jobsData={jobs} onShow={handleBarVisibility} onFilter={handleFilters} trigger={jobs}/>
          :(<div className='loaderContainer'>
              <div className="loader">
                <span className="loader-text">loading</span>
                <span className="load"></span>
              </div>
            </div>)
        }

      </main>

    </>
  )
}

export default App