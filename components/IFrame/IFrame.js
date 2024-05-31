import React, { useState, useEffect } from "react";

const IFrame = ({
  url,
  className = "",
  editView,
  setEditorContent,
  changedContent,
  setIsSaved,
  setSection,
  ...props
}) => {
  const [editElement, setEditElement] = useState();

  const titleHandleClick = (e) => {
    let clickedElement = e.target;
    setEditorContent(clickedElement);
    setSection('Título del trabajo');
  };

  const handleClick = (event) => {
    event.preventDefault();
    const clickedElement = event.target;
    if (clickedElement.tagName == 'SECTION' || clickedElement.tagName == 'HTML' || clickedElement.id == "preview-content" || clickedElement.id == "preview" || clickedElement.id == "container-ruller") {
      console.log('Invalid position');
    }
    else {
      setEditorContent(clickedElement);
      setEditElement(clickedElement);
      console.log('element is clicked');
    }
  };

  const handleMouseOver = (event) => {
    const hoveredElement = event.target;
    if (hoveredElement.tagName == 'SECTION' || hoveredElement.tagName == 'HTML' || hoveredElement.id == "preview-content" || hoveredElement.id == "preview" || hoveredElement.id == "container-ruller") {
      console.log('Invalid position');
      console.log(hoveredElement.tagName);
    }
    else {
      hoveredElement.style.cursor = "pointer";
      if (!hoveredElement.style) return;
      hoveredElement.style.background = "#bae6fd";
      console.log('mouse over');
    }
  };

  const handleMouseOut = (event) => {
    const leftElement = event.target;
    if (leftElement.tagName == 'SECTION' || leftElement.tagName == 'HTML' || leftElement.id == "preview-content" || leftElement.id == "preview" || leftElement.id == "container-ruller") {
      console.log('Invalid position');
    }
    else {
      if (!leftElement.style) return;
      leftElement.style.background = "none";
      leftElement.style.cursor = "auto";
    }
  };

  useEffect(() => {
    const paperTitle = document.getElementById('title');
    const iframe = document.getElementById("documentWindow");

    const addIframeEventListeners = () => {
      if (editView && iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.addEventListener("click", handleClick);
        iframeDoc.addEventListener("mouseover", handleMouseOver);
        iframeDoc.addEventListener("mouseout", handleMouseOut);
      }
    };

    const injectMathJax = () => {
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        const script = iframeDoc.createElement("script");
        script.type = "text/javascript";
        script.id = "MathJax-script";
        script.async = true;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js";
        iframeDoc.head.appendChild(script);
      }
    };

    if (editView) {
      if (paperTitle) {
        paperTitle.addEventListener('click', titleHandleClick);
      }
      if (iframe) {
        iframe.addEventListener('load', () => {
          addIframeEventListeners();
          injectMathJax();
        });
      }
    }

    // Cleanup function
    return () => {
      if (paperTitle) {
        paperTitle.removeEventListener('click', titleHandleClick);
      }
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.removeEventListener("click", handleClick);
        iframeDoc.removeEventListener("mouseover", handleMouseOver);
        iframeDoc.removeEventListener("mouseout", handleMouseOut);
      }
      if (iframe) {
        iframe.removeEventListener('load', addIframeEventListeners);
      }
    };
  }, [editView]);

  useEffect(() => {
    if (!editElement) return;
    // Set the Iframe's content as Editor's content
    editElement.innerHTML = changedContent;
    setIsSaved(false);
    // Re-render MathJax content
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, [changedContent]);

  return (
    <>
      <iframe
        id="documentWindow"
        src={url}
        className={`border-none w-full h-full my-4 overflow-unset overflow-none ${className}`}
        {...props}
      />
    </>
  );
};

export default IFrame;