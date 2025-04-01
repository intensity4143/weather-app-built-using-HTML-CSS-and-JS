const settingBtn = document.getElementById('setting')
settingBtn.addEventListener('click',(e)=>{
    document.getElementById('home-container').style.display = "none"
    document.getElementById('map-container').style.display = "none"
    document.getElementById('setting-c').style.display = "block"
})

const buttons = document.querySelectorAll('.setting-container .btn-container .btn')
buttons.forEach(btn => {
    btn.addEventListener('click',(e)=>{
        const parent = e.target.parentElement
        if(e.target.classList.contains("lbtn")){
            // console.log("yes")
            parent.children[0].style.left = "0"
        }
        else{
            parent.children[0].style.left = "125px"
        }
    })
});

document.getElementById('reset-setting').addEventListener("click",()=>{
    const slider = document.querySelectorAll('.setting-container .btn-container .btn-slide')
    slider.forEach((item)=>{
        item.style.left = "0px";
    })
})