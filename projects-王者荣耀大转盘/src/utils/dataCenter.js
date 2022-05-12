const Datas = new Map();

const dataCenter = {
    setData: (key, value) => {
        Datas.set(key, value);
    },

    getData: (key) => {
        return Datas.get(key)
    }
}

export default dataCenter