class HeaderComponent {
  private title: string;
  constructor(title: string) {
    this.title = title;
  }
  render(): string {
    return `
            <h1 class="text-black cursor-pointer md:text-[22px]"><i class="fa-solid fa-film pr-1"></i>${this.title}</h1>
            <div id="input-wrapper" class="items-center flex gap-2">
                <input
                    type="text"
                    placeholder="Search for the movie"
                    id="searchInput"
                    class="h-[90%] placeholder:text-black placeholder:md:text-[18px] bg-transparent outline-none text-sm border-b-[1px] border-black px-2 py-1 hidden md:flex max-w-[50vw]"
                />
                <i class="fa-solid fa-magnifying-glass" id="search"></i>
            </div>
        `;
  }

  toggleInput() {
    const btn = document.querySelector("#search");
    if (btn) {
      btn.addEventListener("click", () => {
        const input = document.getElementById("searchInput");
        if (input) {
          input.classList.toggle("flex");
          input.classList.toggle("hidden");
        }
      });
    }
  }
}

const myHeader = new HeaderComponent("Movies");
const header = document.querySelector("#header");
if (header) {
  header.innerHTML = myHeader.render();
}
myHeader.toggleInput();
