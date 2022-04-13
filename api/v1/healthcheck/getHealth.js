import   axios  from "axios"
import   {performance}  from "perf_hooks"


export const getHealth = (req, res) => {
	const start = performance.now()
	const promises = []
	const healthCheck = {
		durationInMillis: 0,
		tests: [],
	}
	promises.push(buildPromise("https://www.google.com/", healthCheck))
	Promise.all(promises)
		.then(() => {
			healthCheck.durationInMillis = Math.floor(performance.now() - start)
			res
				.status(healthCheck.tests.find((x) => x.testResult === "FAILED") ? 503 : 200)
				.send(healthCheck)
		})
		.catch((error) => {
			console.error(
				`Unexpected error while performing health check. Err: ${error.message}, Stack: ${error.stack}`
			)
		})
}

const buildPromise = (endpoint, healthCheck) => {
	let healthCheckTest = {}
	const currentTime = performance.now()
	return new Promise(async (resolve, reject) => {
		await axios
			.get(endpoint)
			.then((response) => {
				healthCheckTest = {
					testName: endpoint,
					durationInMillis: Math.floor(performance.now() - currentTime),
					testResult: response.status === 200 || response.status === 204 ? "PASSED" : "FAILED",
				}
			})
			.catch((err) => {
				healthCheckTest = {
					testName: endpoint,
					durationInMillis: Math.floor(performance.now() - currentTime),
					testResult: "FAILED",
					error: error.message,
				}
			})
		healthCheck.tests.push(healthCheckTest)
		resolve()
	})
}
