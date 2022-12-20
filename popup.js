function main() {
	const tabs = document.getElementById("tabs");
	let allTabs = [];
	chrome.runtime.sendMessage({ type: "getTabs" }, function (response) {
		allTabs = response;
		tabs.innerHTML = "";
		allTabs.forEach((element, index) => {
			let tab = document.createElement("li");
			let tabTitle = document.createElement("p");
			tabTitle.innerHTML = element.title;
			let button = document.createElement("button");
			button.innerHTML = "x";
			if (element.active) {
				tab.classList.add("active");
			}
			tab.addEventListener("click", function () {
				chrome.tabs.update(element.id, { active: true });
			});
			button.addEventListener("click", function () {
				chrome.tabs.remove(element.id);
			});

			tab.append(tabTitle);
			tab.append(button);
			tabs.append(tab);
			console.log(element);
		});
	});
}
window.addEventListener("load", function () {
	main();
});
chrome.tabs.onActivated.addListener(main);
chrome.tabs.onMoved.addListener(main);
chrome.tabs.onRemoved.addListener(main);
chrome.tabs.onUpdated.addListener(main);
