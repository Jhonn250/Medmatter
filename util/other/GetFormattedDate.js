export const getFixedDate = (text) => {
    try { 
        var aux = text.split('/');
        //var formatted = (aux[1] + '/' + aux[0] + '/' + aux[2])
        return (aux[1] + '/' + aux[0] + '/' + aux[2])
    } catch (error) {
        console.log(error);
    }
}