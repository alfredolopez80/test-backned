const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dotenv = require("dotenv");

dotenv.config();

const getLive = async (req, res, next) => {
    res.status(200).json(
        "API for Getting minimum time to remove all cars containing illegal goods",
    );
};

const postMinimalTime = async (req, res, next) => {
    try {
        const string = req.body.string.toString();
		let length = string.length;
		if (length <= 0) {
			throw new Error("String can't be empty");
		}
		if (length > 200000 - string.slice(length - 1)) {
            throw new Error("String length can't be greater than 200000");
        }
		let left = 0;
		let result = length;

		for (let i = 0; i < length; i++) {
			if (
                string.slice(i, i + 1) != "1" &&
                string.slice(i, i + 1) != "0"
			) {
				throw new Error("String must contain only 0 and 1");
			}
			left = Math.min(
				left + (parseInt(string.slice(i, i + 1)) - 0) * 2,
				i + 1,
			);
			result = Math.min(result, left + length - i - 1);
		}
		console.log("Output: ", result);
		res.status(200).json({result: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
};


const get404 = (req, res, next) => {
    res.status(500).json({ status: "error", messages: "Route Not Found" });
};

module.exports = {
    getTest: getLive,
    postMinimalTime: postMinimalTime,
    get404: get404,
};
