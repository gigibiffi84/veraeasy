const books = [
    {
        id: 0,
        title: 'Book1'
    },
    {
        id: 1,
        title: 'Book2'
    },
    {
        id: 2,
        title: 'Book2'
    }

]
const getBooks = () => {
    return new Promise((resolve)=>{
        resolve([...books])
    })
}