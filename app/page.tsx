import source from '../index.html?raw';

const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .trim();

if (!body) throw new Error('The landing page body could not be read.');

export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
