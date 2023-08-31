
//As-synchronous function (async) make the data synchronous 
//It wait till the data appear and then go to next line
//Or you can say async goes line by line
const handCategory = async () => {
    /**
     * fetch made promise & it is as-synchronous
     * Await wait for data to appear
     */
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    //convert promise data to JSON data
    const data = await response.json();
    //get the element where you want to show the data
    const tabContainer = document.getElementById('tab-container');
    //Show data in each element in dynamic way
    data.data.news_category.slice(0, 3).forEach(category => {
        // console.log(category);
        const div = document.createElement('div');
        //in anchor tag add a function to get the data by id with a function call
        div.innerHTML = `
        
            <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name} </a>
        `;
        tabContainer.appendChild(div);
    });
}
//
const handleLoadNews = async (categoryId) => {
    // console.log(categoryId);
    //get the data using fetch for category name
    const response = await fetch(
        `https://openapi.programming-hero.com/api/news/category/${categoryId}`
        );
    const data = await response.json();
    const categoryData = data.data
    const cardContainer = document.getElementById('card-container');
    //remove default value using empty string
    cardContainer.innerHTML = "";
    categoryData.forEach((news) => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src=${news.image_url} /></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title.slice(0, 40)}
            <div class = "badge badge-secondary p-5">${news?.rating?.badge}</div>
          </h2>
          <p>${news.details.slice(0,50)}</p>
        <h3>Total Views: ${news.total_view? news.total_view : "No view"}</h3>
          
        <div class="card-footer flex justify-between mt-8">
            <div class="flex gap-3 justify-around">
                <div>
                    <div class="avatar online">
                        <div class="w-14 rounded-full">
                            <img src=${news.author?.img}>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 class="font-medium">${news.author?.name}</h6>
                    <small>${news.author?.published_date}</small>
                </div>
            </div>
            <div class="card-actions justify-end">
                <button onclick = "handleModal('${news._id}')" class="btn btn-primary">Details</button>
                
            </div>
        </div>
          
        </div>
    </div>
        `;
        cardContainer.appendChild(div);
    })
}
const handleModal = async (newsId) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    console.log(data.data[0]);



    console.log(newsId);
    const modal = document.getElementById('modal');
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box w-11/12 max-w-4xl">
    <figure class="text-center"><img class="w-9/12 mx-auto" src=${data.data[0].image_url} /></figure>

      <h3 class="font-bold text-lg mt-8">${data.data[0].title.slice(0,50)} 
      <div class = "badge ml-10 badge-secondary p-5">${data?.data[0]?.rating?.badge}</div></h3>
      <p class="py-4">${data.data[0].details}</p>
      
      <div class="modal-action">
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
    `;
    modal.appendChild(div);

    //To show modal we used take the modal id and then setModal() function to call the modal.<dialog {   id="my_modal_5"    } class="modal modal-bottom sm:modal-middle">
    const modalSet = document.getElementById('my_modal_5');
    modalSet.showModal();

}


handCategory();
//set default card news
handleLoadNews("01");