function download_file() {
    const link  =document.createElement('a')
    const body = document.querySelector('body')
    if (document.getElementById('download').value === 'bert'){
        link.href = 'questions/download_file/bert.csv'
        link.download = 'bert.csv'
        link.style.display = 'none'
    }else if (document.getElementById('download').value === 'bow'){
        link.href = 'questions/download_file/bow.csv'
        link.download = 'bow.csv'
        link.style.display = 'none'
    }else if (document.getElementById('download').value === 'glove'){
        link.href = 'questions/download_file/glove.csv'
        link.download = 'glove.csv'
        link.style.display = 'none'
    }else if (document.getElementById('download').value === 'tfidf'){
        link.href = 'questions/download_file/tfidf.csv'
        link.download = 'tfidf.csv'
        link.style.display = 'none'
    }
    body.appendChild(link)
    link.click()
    body.removeChild(link)

}
