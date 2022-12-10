import axios from 'axios';
const cheerio = require('cheerio');

export default function Page({ data }) {
    if (data === false)
        return <div>Invalid URL</div>;
    else if (data === null)
        return <div>That URL is an API endpoint.</div>
    else
        return (
            <div id='text-dump'>
                {data}
            </div>
        );
}

export async function getServerSideProps({ params }) {
    const slug = "https://" + params.slug.join('/');
    let response;
    try{
        response = await axios.get(slug);
    }
    catch(error){
        return {props:{data:false}}
    }
    if (typeof response.data !== "string")
        return { props: { data: null } }
    const $ = cheerio.load(response.data);
    $('script, link').remove();
    let t = [];
    $('body *').contents().filter(function () {
        return this.nodeType === 3; //Node.TEXT_NODE
    }).each(function () {
        t.push($(this).text());
    });
    t = t.join(" ");
    let tList = t.split(/\s/gm);
    tList = tList.filter(s => s !== "" && s.match(/\s/gm) === null);
    tList = tList.map(s=>s.replaceAll(/(^\W+)|(\W+$)/gm, ""));
    tList.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const newText = tList.join(" ");
    return { props: { data: newText } };
}