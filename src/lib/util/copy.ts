function copy(text: string) {
    window.clipboardData.setData(text);
    return true;
}

export default copy;