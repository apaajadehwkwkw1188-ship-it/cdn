const axios = require("axios");

(async () => {

    const { data } = await axios.get("https://api.ikyyxd.my.id/edit/jadigta?url=");

    console.log(data);

})();