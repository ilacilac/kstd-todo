# 키다리스튜디오 - 기술과제

## 설치

```shell
$ npm install
```

## 실행

```shell
$ npm run dev
```

## 프로젝트 폴더 스트럭쳐

```
├── README.MD
├── components
│ ├── Modal
│ │ ├── ModalPortal.tsx
│ │ └── TodoModal.tsx
│ └── Todo
│ ├── FetchTodoForm.tsx
│ ├── TodoDragableList.tsx
│ ├── TodoDragableListItem.tsx
│ ├── TodoForm.tsx
│ ├── TodoList.tsx
│ └── TodoListItem.tsx
├── config
│ └── config.ts
├── data
│ └── todos.json
├── lib
│ └── fileHandler.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│ ├── \_app.tsx
│ ├── \_document.tsx
│ ├── api
│ │ ├── todo
│ │ │ └── [id].ts
│ │ └── todos.ts
│ ├── index.tsx
│ └── todos
│ └── [category].tsx
├── service
│ └── todos.ts
├── styles
│ └── global.css
├── tsconfig.json
└── types
└── todo.d.ts : todo 데이터 타입
```

1. SSR / File Logic
   - index.tsx에서 `data/todos.json` 파일을 불러와 SSR을 초기에 진행합니다. 요청하는 로직은 `service/todos.ts` 에 정의되어있고, 해당 api에 따라 파일을 읽어오고, 업데이트하는 로직은 `lib/fileHandler.ts` 에서 합니다.
2. 메인화면 (index.tsx)
   - 초기에 받아온 todos를 state로 관리 해줍니다.
   - todos의 카테고리들을 상단에 보여주고, 클릭하면 해당 카테고리를 보여주는 페이지로 이동합니다.
   - todo를 추가할 수 있는 `<TodoForm>`을 렌더링 합니다.
   - Header 영역의 "Todo List"를 클릭하면 메인화면으로 올 수 있습니다.
3. 카테고리 화면 (pages/todos/[category.tsx])
   - todos데이터를 하위 `<TodoList>` 컴포넌트에 넘겨주고 todos를 map()메서드로 배열요소를 호출 하여 자식컴포넌트 `<TodoListItem>`로 보여줍니다.
   - 좌측 상단 뒤로가기 버튼을 누르면 이전 페이지로 이동합니다
4. component - TodoDragableList
   - todos데이터를 하위 `<TodoDragableList>` 컴포넌트에 넘겨주고
     Drag&Drop(DND)가 가능하게 `react-beautiful-dnd` 라이브러리에서 제공하는 `DragDropContext, Droppable`로 wrapping 합니다. (순서변경은 현재 메인화면에서만 가능합니다.)
   - TodoDragableList에서는 todos를 map()메서드로 배열요소를 호출 하여 자식컴포넌트 `<TodoDragableListItem>`로 보여줍니다.
5. component - TodoDragableListItem
   - todo의 값으로 UI를 구성합니다.
   - 수정하기 버튼 클릭 시, 모달화면의 상태값을 `true`로 변경하여 모달창을 보여줍니다.
   - 삭제하기 버튼 클릭 시, 상위컴포넌트에서 전달받은 `deleteTodo`를 todo의 id값을 인자로 넣어주고 호출합니다.
6. component - TodoForm
   - 상위 컴포넌트에서 addTodo를 받아, 추가하기 버튼 클릭 시, click event와 내부적으로 관리하고 있는 state를 인자로 넣어 호출합니다.
   - task와 category가 입력되지 않을 때, 버튼은 비활성화 됩니다.
   - 시작일은 종료일보다 작아야하고, 종료일은 시작일보다 커야 합니다.
   - 처음등록시 모든 task의 status는 "대기중" 입니다.
7. component - ModalPortal
   - app이 실행될 때, 지정된 DOM요소를 탐색한 후, 해당 DOM에 createPortal을 해줍니다.
8. component - TodoModal
   - open state값에 따라 위에 설정한 ModalPortal에 `<TodoModal>`을 만들어줍니다.
   - `<TodoModal>`하위에는 todo를 수정할 수 있는 `<FetchTodoForm>`을 렌더링 합니다.
