const conversionTime = (time) => {
    const date = new Date();
    date.setTime(time * 1000);
    return time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};

export default conversionTime;