const init = async () => {
    try {
        const res = await fetch('https://api-form-deltacapital.onrender.com');
        console.log('status:', res.status);
    } catch (error) {
        console.log(error);
    }
};
init();