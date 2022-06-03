import { useState } from 'react';
import IFrame from 'components/IFrame/IFrame';
import Main from 'components/Main/Main';
import useUser from 'utils/useUser';

const Post = ({ entry, course }) => {
    const { user } = useUser();
    const [showFiles, setshowFiles] = useState(false);
    const toggleShowFiles = () => setshowFiles(!showFiles);
    const author = entry?.author;
    const isCurrentUserAuthor = author.id === user?.id;

    const files = entry?.files?.map(file =>
        <a target='_blank' key={`file_attachment_${file.id}`} href={file.url} className='text-primary ml-4 text-xs underline underline-offset-1'>{file.title || file.filename}</a>
    );
    console.log('OVER HEre!!', entry, course, isCurrentUserAuthor);
    return (
        <Main className=''>
            <article className='flex flex-col gap-4 p-4'>
                <div className='flex flex-row items-center justify-between pb-2 border-2 border-transparent rounded-none border-b-black'>
                    <h2 class="col-span-4 text-4xl">{entry.title}</h2>
                    {isCurrentUserAuthor &&
                        <a href={`/posts/${entry.id}/edit`} className='text-primary text-lg'>{'Editar Publicación >'}</a>
                    }
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <section className='col-span-3'>
                        {entry.content.map((content, contentIndex) =>
                            <section key={`${content.title}_${contentIndex}`}>
                                <h3 className="text-2xl">{content.title}</h3>
                                <p className='text-xs'>{content.description}</p>
                                <IFrame srcDoc={content.monograph} />
                            </section>
                        )}
                    </section>
                    <aside className='col-span-1 flex flex-col gap-2 pl-4 border-2 border-transparent rounded-none border-l-black'>
                        <h3 className='text-lg'><span className='text-primary pr-2'>Curso:</span>{course.title}</h3>
                        <h4 className='text-xs'><span className='text-primary pr-2 text-lg'>Autor(es):</span>{author.name} {author.lastname}</h4>
                        <a onClick={toggleShowFiles} className='text-primary underline underline-offset-1'>Contenido Adjunto:</a>
                        {showFiles && files}
                    </aside>
                </div>
            </article>
        </Main>
    );
};

export default Post;