context('화면 테스트', ()=>{
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('CountTodo 영역이 잘 보이는지', () => {
    cy.get('.title').should('be.visible');
    cy.get('.title').should('contain.text', '할 일');
    cy.get('.title').should('contain.text', '개 남음');})

  it('Add Todo 영역이 잘 보이는지', () => {
    cy.get('.addTodo > input').should('be.visible');
    cy.get('.addTodo > button').should('be.visible');
  })

  it('Nav바 잘 보이는지', () => {
    cy.get('nav').should('be.visible');
    cy.get('nav').contains('년', { matchCase: false });
    cy.get('nav').contains('MyPage', { matchCase: false });
    cy.get('nav').contains('할 일', { matchCase: false });
    cy.get('nav').contains('중요', { matchCase: false });
    cy.get('nav').contains('로그인/회원가입', { matchCase: false });
  })
})

context('UI 조작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('Todo 추가 기능 테스트', ()=>{
    cy.get('.addTodo > input').type('test 중입니다~');
    cy.get('.addTodo > button').click().then(() => {
      cy.get('.task > label').contains('test 중입니다~',{ matchCase: false });
    })
  })

  it('Todo 완료 기능 테스트', () => {
    cy.get('[type="checkbox"]').first().check().then(()=>{
      cy.get('.check:checked').should('have.length', 1);
      // css 어케 하는지 몰겠다..
    })
  })

  it('Todo 삭제 기능 테스트', ()=>{
    cy.get('button[name="delete"]').eq(-1).click().then(()=>{
        cy.get('.task > label').should('not.contain', 'test 중입니다~');
    })
  })
})
