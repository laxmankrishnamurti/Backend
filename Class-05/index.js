const acceptFunction = (fun) => {
    (num1, num2) => {
        console.log(num1 + num2)
    }
}

acceptFunction((num1, num2) => {
    num1 = 20
    num2 = 25
    fun()
})
