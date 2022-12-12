import Head from 'next/head';
import axios from 'axios';
const cheerio = require('cheerio');

export default function Page({ data }) {
    if (data === false)
        return (
            <div>
                <Head>
                    <title>Website Text Sorter</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                Invalid URL
            </div>);
    else if (data === null)
        return (
            <div>
                <Head>
                    <title>Website Text Sorter</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                That URL is an API endpoint.
            </div>);
    else
        return (
            <div id='text-dump'>
                <Head>
                    <title>Website Text Sorter</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                {data}
            </div>
        );
}

export async function getServerSideProps({ params }) {
    let slug = params.slug.join('/');
    if (slug.startsWith("https:/"))
        slug = "https://" + slug.slice(7);
    else if(slug.startsWith("http:/"))
        slug = "http://" + slug.slice(6);
    else
        slug = "https://" + slug;
    let response;
    try {
        response = await axios.get(slug);
    }
    catch (error) {
        return { props: { data: false } }
    }
    if (typeof response.data !== "string")
        return { props: { data: null } }
    const $ = cheerio.load(response.data);
    $('script, link, style, noscript').remove();
    let t = [];
    $('body *').contents().filter(function () {
        return this.nodeType === 3; //Node.TEXT_NODE
    }).each(function () {
        t.push($(this).text());
    });
    console.log(t);
    t = t.join(" ");
    let tList = t.split(/\s/gm);
    tList = tList.filter(s => s !== "" && s.match(/\s/gm) === null);
    tList = tList.map(s => s.replaceAll(/(^\W+)|(\W+$)/gm, ""));
    tList.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const newText = tList.join(" ");
    return { props: { data: newText } };
}