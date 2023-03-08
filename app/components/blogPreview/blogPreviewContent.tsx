import { FaArrowDown } from "react-icons/fa";


async function getLatestBlog() {
    const res = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2023-02-03&sortBy=publishedAt&apiKey=cb06bf4a5ac344988672fc0a2d4d9c05")
    if (!res.ok) throw new Error("Error fetching blog");
    return res.json();
}

export default async function BlogPreviewContent() {
    const blog = await getLatestBlog();
    const exampleBlog = blog.articles[4]

    console.log(exampleBlog);
    return (
        <div className="h-full flex lg:w-[50%] mx-auto lg:max-w-[50%] w-[95%] flex-col gap-2">
            <div className="w-full relative rounded-xl bg-zinc-800  bg-opacity-30 h-[80vh] overflow-hidden flex flex-col">

            <div className="flex flex-row items-center justify-between p-3 border-b-[2px] border-b-neutral-700">
                <p className="text-xs text-neutral-400">Author: <a href="#author" className="underline duration-150 hover:text-sky-600">{exampleBlog.author}</a></p>
                <p className="text-xs text-neutral-400">Published at: {exampleBlog.publishedAt}</p>
            </div>

                <div className="p-10">
                    <div className="max-w-[70%] mx-auto p-4 mb-9">
                        <h1 className="text-3xl text-neutral-100 text-center font-bakbak">{exampleBlog.title}</h1>
                    </div>

                    <div>
                        <p className="text-neutral-200 tracking-wide leading-relaxed">
                            {exampleBlog.content} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, saepe modi blanditiis corrupti placeat ex ipsum fugiat reiciendis nisi porro voluptate pariatur, eaque quam autem beatae nam, dolores ullam rerum tempora excepturi! Animi voluptatibus fugit veniam vitae quaerat, dolorem tempore nostrum commodi, harum deleniti vero earum. Consectetur quam incidunt eveniet laborum, veniam eum! Quaerat, dolore. Adipisci, assumenda? Et maxime, velit dolorum incidunt molestiae odit recusandae quaerat numquam laborum nemo eaque magni laudantium, quo repellendus. Vero autem, a minus est perspiciatis quisquam veritatis quam! Quidem hic vitae mollitia delectus officia temporibus adipisci dolorem ipsum dolores quod soluta omnis reprehenderit tempora totam sequi, ut amet, enim animi provident, vero aut? Magni quod sapiente numquam saepe pariatur dignissimos nam vero rem exercitationem corporis. Illo rerum, voluptate minus quidem, quo suscipit ad dicta tempora laborum ducimus facere distinctio pariatur consequatur quae enim expedita in quisquam, aspernatur itaque asperiores. Neque quis maxime veniam eos laudantium. Autem aliquid blanditiis ut libero, suscipit vel reiciendis quam nesciunt facere tempore laborum perspiciatis itaque quasi quia, eveniet beatae quas fugit saepe quae placeat accusamus odit atque reprehenderit? Praesentium in fuga expedita eius, possimus enim totam doloremque quas repudiandae consectetur accusantium, sunt quam? Magnam consequatur quidem perspiciatis eligendi in, temporibus et saepe harum reprehenderit aliquid obcaecati distinctio modi illo vero? Quo impedit nesciunt ab? Quia error minima impedit, officia eaque unde ab atque alias odio vitae quibusdam. Iste animi nesciunt sapiente sed pariatur tempora officiis quod ratione dolorum. Pariatur soluta praesentium, iste quaerat animi, accusantium esse officia, optio natus sint repellendus accusamus recusandae illo. Enim et ipsum necessitatibus placeat itaque. Ex facere facilis aliquam magnam sunt, error assumenda ut in ullam laudantium, neque aspernatur eos voluptate velit deleniti possimus minima iure nisi. Ullam incidunt rerum, a suscipit sit doloremque magnam autem consequuntur voluptas, blanditiis, odit assumenda eaque culpa recusandae dolores quia quo. Rerum doloremque ratione, provident eum perspiciatis, illo iste soluta itaque laboriosam quaerat aperiam odit. Blanditiis in voluptates magni, iste quibusdam minima eius incidunt vel nemo nobis debitis exercitationem doloremque molestias aliquid molestiae dolores perspiciatis, eligendi dignissimos cupiditate a? Saepe ex voluptatem ut unde optio hic dolorum quod nisi temporibus sunt. Asperiores, fugiat fuga a, et dolores quod ratione repudiandae repellat repellendus 
                        </p>
                    </div>
                </div>

                <div className="w-full h-60 max-h-60 flex bg-neutral-900 text-neutral-300 bg-opacity-90 absolute bottom-0 items-center justify-center flex-col">
                    <FaArrowDown className=" text-5xl cursor-pointer duration-100 hover:text-neutral-100" />
                    <p>load more...</p>
                </div>

            </div>
        </div>
    )
}