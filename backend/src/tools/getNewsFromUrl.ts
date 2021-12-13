import ogs, { OpenGraphProperties, OpenGraphImage } from 'open-graph-scraper';

export const getNewsFromURL = async (url: string) => {
  // ogs(options).then((data) => {
  //   const { error, result } = data;
  //   console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the results object.
  //   console.log('result:', result); // This contains all of the Open Graph results
  // });
  const data = await ogs({ url });

  if (data.error) {
    return false;
  }
  const og = data.result as OpenGraphProperties;
  const title = og.ogTitle;
  const imageObj = og.ogImage as unknown as OpenGraphImage;
  const image = imageObj.url;

  return { title, image };
};
