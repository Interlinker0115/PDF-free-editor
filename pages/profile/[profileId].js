import { useState, useCallback, useEffect, useRef } from 'react';
import { updateProfile } from 'handlers/profile';
import { upload } from 'handlers/bll';
import withSession from 'utils/withSession';
import { request } from 'utils/graphqlRequest';
import { query } from 'gql';
import Main from 'components/Main/Main';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import UserInfo from 'components/Profile/UserInfo';
import Courses from 'components/Profile/Courses';
import Publications from 'components/Profile/Publications';
import EditProfile from 'components/Profile/EditProfile';

import { isProfessor as isUserProfessor} from 'utils';

const DEFAULT_USER_ID = 'me'

const VIEW_STATES = {
    USER: 'userInfo',
    COURSE: 'courses',
    POSTS: 'posts',
    EDIT: 'editProfile',
    ARCHIVE: 'ARCHIVE'
}

const Profile = ({ profile, courses, posts, archivePosts, isProfessor }) => {
    const router = useRouter();
    useEffect(() => {
        if (!profile) router.push('/');
    }, [profile]);

    const [formState, setFormState] = useState(profile);
    const [avatarImage, setAvatarImage] = useState(null);
    const [activeView, setActiveView] = useState(VIEW_STATES.USER);
    const { query: { profileId } } = useRouter();
    const isCurrentUserProfile = profileId === DEFAULT_USER_ID;

    const refs = {
        avatar: useRef()
    };

    const onChange = useCallback(async (e, name) => {
        let itemValue;
        if (refs[name]) {
            const _files = refs[name]?.current?.files;
            const files = await upload(_files);
            itemValue = files;
            if (FileReader && _files && _files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    setAvatarImage(fr.result);
                }
                fr.readAsDataURL(_files[0]);
            }
        } else {
            itemValue = e.target.value;
        }
        delete formState[name];
        console.log('OVER HERE!!!', refs.avatar?.current, refs.avatar?.target, avatarImage);
        setFormState({ [name]: itemValue , ...formState })
    }, [formState]);

    const submitUpdateProfile = useCallback(async (e) => {
        e.preventDefault();
        const { id, role, ...profileData } = formState;
        profileData.role = role.id;
        const entry = await updateProfile(id, {
            ...profileData
        });

        if (entry.error) {
            alert('No se pudo actualizar la entrada');
        } else {
            setFormState({ ...entry, ...profileData});
        }
    }, [formState]);

    const avatarView = avatarImage || formState.avatar?.url ? (
        <img htmlFor='avatar' className='h-full w-full' src={avatarImage || formState.avatar.url} />
    ) : (
        <FontAwesomeIcon htmlFor='avatar' className='p-8 min-w-fit text-2xl' icon={faCircleUser} />
    );

    console.log('OVER HERE!!!', refs.avatar);

    return (
        <Main>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.avatarCard}>
                        {activeView === VIEW_STATES.EDIT ? (
                            <label className='h-full w-full cursor-pointer'>
                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='avatar'
                                    id='avatar'
                                    ref={refs.avatar}
                                    onChange={(e) => onChange(e, 'avatar')}/>
                                {avatarView}
                            </label>
                        ) : avatarView}
                    </div>
                    {activeView === VIEW_STATES.EDIT &&
                        <div className='flex flex-row justify-start item-center gap-2 my-5'>
                            <button type='button' className={styles.btn} onClick={submitUpdateProfile}>Guardar</button>
                            <button type='button' className={styles.btn} onClick={() => setFormState(profile)}>Cancelar</button>
                        </div>
                    }
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.tabs}>
                        <div>
                            <a
                                className={activeView === VIEW_STATES.USER ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.USER)}>
                                Data personal
                            </a>
                            <a
                                className={activeView === VIEW_STATES.COURSE ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.COURSE)}>
                                Cursos
                            </a>
                            <a
                                className={activeView === VIEW_STATES.POSTS ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.POSTS)}>
                                Publicaciones
                            </a>
                            {(isProfessor && isCurrentUserProfile) &&
                                <a
                                    className={activeView === VIEW_STATES.ARCHIVE ? styles.activeTab : styles.tabItem}
                                    onClick={() => setActiveView(VIEW_STATES.ARCHIVE)}>
                                    Archivo
                                </a>
                            }
                        </div>
                        {isCurrentUserProfile &&
                            <a
                                className={`${styles.editTab} ${activeView === VIEW_STATES.EDIT ? styles.activeTab : styles.tabItem}`}
                                onClick={() => setActiveView(VIEW_STATES.EDIT)}>
                                Editar Perfil >
                            </a>
                        }
                    </div>
                    <div className={styles.tabContent}>
                        {activeView === VIEW_STATES.USER &&
                            <UserInfo
                                {...formState} />
                        }
                        {activeView === VIEW_STATES.COURSE &&
                            <Courses items={courses} />
                        }
                        {activeView === VIEW_STATES.POSTS &&
                            <Publications items={posts} />
                        }
                        {activeView === VIEW_STATES.ARCHIVE &&
                            <Publications items={archivePosts} />
                        }
                        {activeView === VIEW_STATES.EDIT &&
                            <EditProfile profile={formState} onChange={onChange} setProfile={setFormState} />
                        }
                    </div>
                </div>
            </div>
        </Main>
    );
}

const styles = {
    mainContainer: 'my-8 grid grid-cols-4 gap-8',
    leftContainer: 'flex flex-col justify-between item-center',
    rightContainer: 'col-span-3 flex flex-col gap-6',
    avatarCard: 'card text-gray-400 bg-secondary rounded-none h-60',
    tabs: 'tabs border-transparent border-b-black border-b-2 w-full justify-between',
    tabItem: 'tab text-2xl pl-0 hover:text-primary hover:underline hover:underline-offset-1',
    activeTab: 'tab text-2xl tab-active text-primary pl-0',
    editTab: 'text-other pr-0',
    tabContent: 'border-b-black border-b-2 pb-4',
    btn: 'btn bg-other text-white hover:bg-primary btn-md rounded-full',
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: 'label-text text-lg border-2 border-transparent py-2 rounded-none border-b-black',
};

export const getServerSideProps = withSession(async function ({ req }) {
    const currentUser = req.session.get('user');
    if (!currentUser) {
        return { props: {} };
    }
    const urlSplit = req.url.split('/');
    const userIdParam = urlSplit[urlSplit.length - 1];
    const isCurrentUserProfile = userIdParam === DEFAULT_USER_ID && currentUser;
    const isProfessor = isUserProfessor(currentUser.role?.id);
    const profileId = isCurrentUserProfile ? currentUser.id : userIdParam
    const profileQuery = isCurrentUserProfile ?
        query.user.GET_PRIVATE_USER_PROFILE : query.user.GET_PUBLIC_USER_PROFILE;

    const { user: profile, allCourses, allPosts: posts } = await request([
        profileQuery(profileId),
        (isProfessor && isCurrentUserProfile) ?
            query.user.GET_PROFESOR_COURSES(profileId) : query.user.GET_STUDENT_COURSES(profileId),
        query.user.GET_USER_POSTS(profileId)
    ]);

    let archivePosts = {};
    if (isProfessor && isCurrentUserProfile) {
        const profesorCourses = allCourses.map(course => course.id);
        archivePosts = await request(
            query.posts.GET_PROFESOR_COURSES_POSTS(profesorCourses)
        );
    }

    return {
        props: {
            profile,
            courses: allCourses,
            posts: posts,
            archivePosts: archivePosts.allPosts || [],
            isProfessor
        }
    };
});

export default Profile;
