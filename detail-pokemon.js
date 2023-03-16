const stats=[
    {
        name:'HP',
        value: 5
    },
    {
        name:'Attack',
        value: 7
    },
    {
        name:'Defense',
        value: 3
    },
    {
        name:'S.Attack',
        value: 7
    },
    {
        name:'S.Defense',
        value: 4
    },
    {
        name:'Speed',
        value: 2
    },
    

]
          
//function for stats//
function innerStat(stat){
    const bars = []
    for (let i=10;i>0;i--){
       if(i<stat){
        bars.push('<span class="bar full-bar"></span>')
       } 
       else{
        bars.push('<span class="bar"></span>')
       }
   }
return bars 
}

function getStats(){
    const main = document.getElementById('stats')

    const innerStats=[]
for (const iterator of stats) {
    const bars=innerStat(iterator.value)
    innerStats.push(`
    <div>
        <div class="bars">
        ${bars.join('')}
        </div>
        <p>${iterator.name}</p>
    </div>
    `)
} 
main.innerHTML= innerStats.join('')

}

getStats()