import React from "react";

class NewsTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name1: "News Loading ....................", count: 0 };

    }
    async componentDidMount() {
        let res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.NEWS_API_KEY}`
        );
        let data = await res.json();
        let arr = data.articles.map((p) => {
            return (
                <div class="p-8">
                    {/* <!--Card 1--> */}
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <img class="w-full" src={p.urlToImage} alt=" " />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{p.title}</div>
                            <p class="text-gray-700 text-base">
                                {p.description}
                            </p>
                            <button class="font-bold text-xl mb-2"> <a href={p.url}>Read more</a></button>
                        </div>
                    </div>
                </div>
            );
        });
        console.log(arr);
        this.setState({ name1: arr });
    }
    render() {
        console.log(" i am render", this.state.count);
        return <div class="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1">{this.state.name1} </div>;
    }
}
export default NewsTop;