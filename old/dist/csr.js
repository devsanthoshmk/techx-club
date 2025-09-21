function route(){
    const params = new URLSearchParams(window.location.search);
    const value = params.get('q');
    console.log(value);

    questionSections[state.currentQuestion].style.display = 'none';
    state.currentQuestion++;
    questionSections[parseInt(value)].style.display = 'flex';

}

document.addEventListener("DOMContentLoaded",route)
    