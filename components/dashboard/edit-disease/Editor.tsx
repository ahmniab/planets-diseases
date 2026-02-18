'use client';
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header';
import Paragraph from "@editorjs/paragraph";
import simpleImage from '@editorjs/simple-image';
import List from '@editorjs/list';
import Table from '@editorjs/table'
import Delemeter from '@editorjs/delimiter'
import { useRef, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { diseaseDoc, diseaseDocBlock, diseaseDocData } from '@/types/disease';

const EditorContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  minHeight: '600px',
  overflowY: 'hidden',
  textOverflow: 'clip !important',
  '& .ce-paragraph': {
    overflowWrap: 'anywhere',
  },

}));


const Editor: React.FC<{diseaseDoc:diseaseDocData, onChange?: (data: any) => void}> = ({diseaseDoc, onChange}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = 'editorjs';

  console.log('Initializing Editor with diseaseDoc:', diseaseDoc);

  useEffect(() => {
    const holder = window.document.getElementById(holderId);
    if (editorRef.current) return;
    
    // Clear any existing editor content (handles React Strict Mode double mount)
    // holder.innerHTML = '';

    const editor = new EditorJS({
      holder: holderId,
      data: diseaseDoc,
      autofocus: true,

      tools: { 
        header: Header,
        paragraph: {
          class: Paragraph as any,
          inlineToolbar: true, 
          config: {
            placeholder: 'ابدأ بالكتابة هنا...',
          }
        },
        image: {
          class: simpleImage,
          inlineToolbar: true
        },
        list: List,
        table: {
          class: Table as any,
          inlineToolbar: true,
        },
        delimiter: Delemeter,
      },
      i18n: {
        /**
         * Text direction
         */
        direction: 'rtl',
      },

      async onChange(api) {
        const savedData = await api.saver.save();
        onChange?.(savedData);
      },
    });
    
    editorRef.current = editor;

  }, []);

  return <>
      <EditorContainer>
        <div id={holderId} />
      </EditorContainer>
    </>;

}
export default Editor;