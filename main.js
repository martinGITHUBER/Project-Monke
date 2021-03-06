window.onload = () => {
	chrome.storage.sync.get("hack_type", data => {
		if(data.hack_type == "set") {
			setTimeout(() => {
				let letters = Array.from(document.getElementById("words").children).map(word => Array.from(word.children).map(l => l.innerText)).map(w => w.join("")).join(" ").split("");
				const restartButton = document.getElementById("restartTestButton");
				console.log(letters[0]);
		
				let port;
				port = chrome.runtime.connect({name: "hack"});
				port.postMessage({
					type: "letters",
					letters
				});
				port.onMessage.addListener(msg => {
					console.log(msg);
				});
		
				restartButton.addEventListener("click", () => {
					setTimeout(() => {
						letters = Array.from(document.getElementById("words").children).map(word => Array.from(word.children).map(l => l.innerText)).map(w => w.join("")).join(" ").split("");
						if(!port) port = chrome.runtime.connect({name: "hack"});
						port.postMessage({
							type: "letters",
							letters
						});
						port.onMessage.addListener(msg => {
							console.log(msg);
						});
					}, 1000);
				});

				document.getElementById("words").addEventListener("click", e => {
					console.log("words");
					port.postMessage({
						type: "stop"
					});
				});
				/* chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
					chrome.debugger.sendCommand({
						tabId: sender.tab.id
					}, "Input.dispatchKeyEvent", {
						type: "keyDown",
						text: letters[0],
						unmodifiedText: letters[0],
					});
				}); */
			}, 1000);
		}
	});
}