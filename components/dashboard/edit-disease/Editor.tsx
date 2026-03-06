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
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  minHeight: '600px',
  overflowY: 'hidden',
  textOverflow: 'clip !important',
  '& .ce-paragraph': {
    overflowWrap: 'anywhere',
  },
  '& .ce-toolbar__plus': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.black
    },
  },
  '& .ce-toolbar__settings-btn': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.black
    },
  },
  '& .ce-paragraph.cdx-block': {
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  },
  '& .cdx-list__checkbox-check': {
    color: theme.palette.common.black,
  },
  '& .tc-add-column': {
    color: theme.palette.text.primary,
    '& svg': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      color: theme.palette.common.black,
    },
  },
  '& .tc-add-row': {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.common.black,
    },
  },
  '& .tc-popover': {
    color: theme.palette.common.black,
    '&:hover': {
    },
  },
  '& .tc-toolbox__toggler': {
    color: theme.palette.text.primary,
    borderRadius: theme.spacing(1),
    '&:hover': {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.primary.main,
    },
  },
  '& .ce-block--selected': {
    borderColor: theme.palette.primary.main,
    '& .cdx-block': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.black,
    },
    '& .tc-add-column': {
      color: theme.palette.common.black,
      '& svg': {
        backgroundColor: 'transparent',
      },
      '&:hover': {
        color: theme.palette.common.black,
      },
    },
    '& .tc-add-row': {
      color: theme.palette.common.black,
      '&:hover': {
        color: theme.palette.common.black,
      },
    },

  },
  '& .codex-editor ::selection': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
  }

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
        direction: 'ltr',
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                'Click to tune': 'اضغط للتعديل',
                'or drag to move': 'أو اسحب للنقل',
              },
            },
            inlineToolbar: {
              direction: 'rtl',
              converter: {
                'Convert to': 'تحويل إلى',
              },
            },
            toolbar: {
              toolbox: {
                Add: 'إضافة',
              },
            },
            popover: {
              Filter: 'بحث',
              'Nothing found': 'لم يتم العثور على شيء',
              'Convert to': 'تحويل إلى',
            },
          },
          toolNames: {
            Text: 'نص',
            Heading: 'عنوان',
            List: 'قائمة',
            Image: 'صورة',
            Table: 'جدول',
            Delimiter: 'فاصل',
            Bold: 'عريض',
            Italic: 'مائل',
            Link: 'رابط',
          },
          tools: {
            header: {
              'Heading 1': 'عنوان 1',
              'Heading 2': 'عنوان 2',
              'Heading 3': 'عنوان 3',
              'Heading 4': 'عنوان 4',
              'Heading 5': 'عنوان 5',
              'Heading 6': 'عنوان 6',
            },
            list: {
              Ordered: 'مرتبة',
              Unordered: 'غير مرتبة',
            },
            image: {
              Caption: 'تعليق',
              'Select an Image': 'اختر صورة',
              'With border': 'بإطار',
              'Stretch image': 'تمديد الصورة',
              'With background': 'بخلفية',
            },
            table: {
              'With headings': 'مع عناوين',
              'Without headings': 'بدون عناوين',
              'Add column to left': 'إضافة عمود لليسار',
              'Add column to right': 'إضافة عمود لليمين',
              'Delete column': 'حذف العمود',
              'Add row above': 'إضافة صف للأعلى',
              'Add row below': 'إضافة صف للأسفل',
              'Delete row': 'حذف الصف',
            },
            paragraph: {
              'Enter something': 'ابدأ بالكتابة هنا...',
            },
            link: {
              'Add a link': 'أضف رابط',
            },
            stub: {
              'The block can not be displayed correctly.':
                'لا يمكن عرض هذا العنصر بشكل صحيح.',
            },
          },
          blockTunes: {
            delete: {
              Delete: 'حذف',
              'Click to delete': 'اضغط للحذف',
            },
            moveUp: {
              'Move up': 'نقل لأعلى',
            },
            moveDown: {
              'Move down': 'نقل لأسفل',
            },
          },
        },
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