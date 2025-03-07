import {useEffect, useState} from 'react';
import {getHTML} from 'handlers/bll';
import {GET_ALL_COURSES, GET_ALL_STUDENTS, GET_ENTRY_BY_ID, request} from 'utils/graphqlRequest';
import useUser from 'utils/useUser';
import {useRouter} from 'next/router';
import withSession from 'utils/withSession';

import Main from 'components/Main/Main';
import PostForm from 'components/Posts/PostForm';
import PostView from 'components/Posts/PostView';
import Loader from 'components/Loader/Loader';
import usePost from "../../../hooks/usePost";
import PostTopBar from "../../../components/Posts/PostTopBar";
import RequestApprovalDialog from "../../../components/Posts/RequestApprovalDialog";
import {SnackbarProvider} from "notistack";
import TopBar from "../../../components/TopBar/TopBar";
import {isAdmin as isUserAdmin, isAdmin} from "../../../utils";
import {GET_ALL_COURSES_ADMIN} from "@/gql/queries/User";

const EditPost = ({post, courses, setIsSaved}) => {
  const router = useRouter();
  const {user} = useUser({redirectTo: '/'});
  useEffect(() => {
    const userWithoutCredentials = user && !user.isLoggedIn;
    const userNotAuthor = user && user.isLoggedIn && user.id !== post.author?.id

    if (userWithoutCredentials || (userNotAuthor && !isAdmin(user?.role?.id))) {
      router.push('/');
    }
  }, [user]);

  const [showEditView, setShowEditView] = useState(false);
  // Dialog setting
  const {
    refs,
    open,
    setOpen,
    formState,
    setAgreedTerms,
    setCoAuthors,
    removeCoAuthor,
    previewIframe,
    showPreview,
    setShowPreview,
    logicCheck,
    editView,
    setEditView,
    setMonograColor,
    complianceView,
    setComplianceView,
    formView,
    setFormView,
    allPass,
    setAllPass,
    onChange,
    handleSave,
    clearSubmitForm,
    handlePublication,
    requestApproval,
    statusBarState,
    showLoadingScreen,
  } = usePost({post, user, courses, setIsSaved});

  const hidePreview = (e) => {
    e.preventDefault();
    setShowEditView(false);
  }

  // console.log({post})

  return (
    <Main className="min-[1536px]:w-full min-[1536px]:max-w-[1536px]">
      <SnackbarProvider maxSnack={3}>
        {showEditView &&
          <TopBar>
            <a
              className='text-other text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'
              onClick={hidePreview}
              children='< Volver a archivo'/>
          </TopBar>
        }
        <PostTopBar
          {...{
            user,
            allPass,
            complianceView,
            showPreview,
            editView,
            formView,
            handlePublication,
            handleSave,
            setFormView,
            setShowPreview,
            setEditView,
            statusBarState,
            setComplianceView,
          }}
        />
        <PostForm
          refs={refs}
          form={formState}
          clearForm={clearSubmitForm}
          onChange={onChange}
          user={user}
          setAgreedTerms={setAgreedTerms}
          setCoAuthors={setCoAuthors}
          removeCoAuthor={removeCoAuthor}
          formView={formView}
          showPreview={!formView}
          courses={courses}
        />
        <PostView
          post={formState}
          user={user}
          courses={courses}
          previewIframe={previewIframe}
          editView={editView}
          setMonograColor={setMonograColor}
          showPreview={showPreview}
          complianceView={complianceView}
          setIsSaved={setIsSaved}
          logicCheck={logicCheck}
          setAllPass={setAllPass}
          showFormView={formView}
        />
        <Loader show={showLoadingScreen}/>
        <RequestApprovalDialog {...{open, setOpen, requestApproval}}/>
      </SnackbarProvider>
    </Main>
  );
}

export default EditPost;

export const getServerSideProps = withSession(async function ({req, params}) {
  const currentUser = req.session.get('user');
  console.log({currentUser});
  if (!currentUser) {
    return {props: {}};
  }
  const isAdmin = isUserAdmin(currentUser.role?.id);

  const {
    post,
    allUsers,
    allCourses
  } = await request([GET_ENTRY_BY_ID(params?.postId), isAdmin ? GET_ALL_COURSES_ADMIN() : GET_ALL_COURSES(currentUser.id), GET_ALL_STUDENTS]);
  const {course, ...postData} = post;

  if (course) {
    postData.course = course.id;
  }

  if (postData?.monograph) {
    postData.monographView = await getHTML(postData.monograph.url);
  }

  console.log("postData", postData.id);

  return {
    props: {courses: allCourses, students: allUsers, post: postData}
  };
});
