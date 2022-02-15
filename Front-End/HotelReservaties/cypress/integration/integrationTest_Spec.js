describe('MyFirstTest', function(){
    it('IntegrationTest', function(){
        cy.visit("http://localhost:4200/")
        cy.request('http://localhost:3000/room/all').then((res) => {
            expect(res.status).equal(200)
            expect(res.body[0]).has.property("name","Double")
            expect(res.body[1]).has.property("name","Room Deluxe")
            expect(res.body[2]).has.property("name","Suite dreams")
            expect(res.body[3]).has.property("name","Single")
        })
    })
})