export const container = document.querySelector("#items");
export const radioButtons = document.querySelectorAll('input[type="radio"]');
export const clearButton = document.querySelector("#clear");

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    let params = new URLSearchParams(window.location.search);
    const checked = document.querySelectorAll('input[type="radio"]:checked');
    checked.forEach((item) => {
      const key = item.getAttribute("name");
      const value = item.value;
      params.set(key, value);
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    history.pushState(null, "", newUrl);
  });
});

export const makeLoading = (loadingItems = 6) => {
  const skeleton = `<div class="bg-white p-4 border rounded shadow">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-700 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>`;

  container.innerHTML = skeleton.repeat(loadingItems);
};