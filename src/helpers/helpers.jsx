 export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}


export function checkWin(correct, wrong, word) {
    let status = 'win';

    //check for win
    word.split('').forEach(letter => {
        if (!correct.includes(letter)) {
            status = '';
        }
    });

    //check for lose - we set 6 attempts
    if (wrong.length === 8) status = 'lose';

    return status;
}

//this is just a helper function.