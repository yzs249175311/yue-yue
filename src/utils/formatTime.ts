export function formatTime(time:number){
    let minutes = Math.floor(time/60).toString().padStart(2,"0")
    let seconds = Math.floor(time%60).toString().padStart(2,"0")
    return `${minutes}:${seconds}`
}