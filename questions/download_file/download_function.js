function download_file() {
    const link  =document.createElement('a')
    const body = document.querySelector('body')
    if (document.getElementById('download').value === 'bert'){
        link.href = 'questions/download_file/bert.json'
        link.download = 'bert.json'
        link.style.display = 'none'
    }else if (document.getElementById('download').value === 'bow'){
        link.href = 'questions/download_file/bow.json'
        link.download = 'bow.json'
    }else if (document.getElementById('download').value === 'glove'){
        link.href = 'questions/download_file/glove.json'
        link.download = 'glove.json'
    }else if (document.getElementById('download').value === 'tfidf'){
        link.href = 'questions/download_file/tfidf.json'
        link.download = 'tfidf.json'
    }
    body.appendChild(link)
    link.click()
    body.removeChild(link)

}
