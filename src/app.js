const yargs = require("yargs")
const { sequelize } = require("./db/connection")
const { updateMovie } = require("./movie copy/movieFunctions")
const { createMovie, readMovie } = require("./movie/movieFunctions")

const app = async (yargsObject) => {
    try{
        await sequelize.sync()
        
        if (yargsObject.create) {
            await createMovie({ title: yargsObject.title, actor: yargsObject.actor})
            let output = {}
            let table = await readMovie()
            for (let movie of table) {
                output.id = movie.id
                output.title = movie.title
                output.actor = movie.actor
                console.log(output)
            }

        } 
        
        else if (yargsObject.read) {
            let output = {}
            let table = await readMovie(({ [yargsObject.key] : yargsObject.value}))
                output.id = table.id
                output.title = table.title
                output.actor = table.actor
                console.log(output)
        }
        
        else if (yargsObject.readAll) {
            let output = {}
            let table = await readMovie()
            for (let movie of table) {
                output.id = movie.id
                output.title = movie.title
                output.actor = movie.actor
                console.log(output)
            }
        }

        else if (yargs.Object.updateMovie) {
            await updateMovie({title: yargsObject.title, actor: yargsObject.actor},{[yargsObject.key] : [yargsObject.value]})
            let output = {}
            let table = await readMovie()
            for (let movie of table) {
                output.id = movie.id
                output.title = movie.title
                output.actor = movie.actor
                console.log(output)
            }
        }

        else if (yargsObject.deleteMovie) {
            await deleteMovie({ [yargsObject.key] : [yargsObject.value] })
            let output = {}
            let table = await readMovie()
            for (let movie of table) {
                output.id = movie.id
                output.title = movie.title
                output.actor = movie.actor
                console.log(output)
            }
        }

        else if (yargsObject.createUser) {
            await createUser({user: yargsObject.user})
            let output = {}
            let table = await readUser()
            for (let user of table){
                output.id = user.id
                output.user = user.user
                console.log(output)
            }
        }

        else if (yargsObject.readUser) {
            let output = {}
            let table = await readUser({ [yargsObject.key] : yargsObject.value})
                output.id = table.id
                output.user = table.user
                console.log(output)
            }
        
        else if (yargsObject.readAllUsers) {
            let output = {}
            let table = await readUser()
            for (let user of table) {
                output.id = user.id
                output.user = user.user
                console.log(output)
            }
        }
        else if (yargsObject.updateUser) {
            await updateUser({user: yargsObject.user}, { [yargsObject.key] : [yargsObject.value] })
            let output = {}
            let table = await readUser()
            for (let user of table) {
                output.id = user.id
                output.user = user.user
                console.log(output)
            }
        }
        
        else if (yargsObject.delete) {
            await deleteUser({ [yargsObject.key] : [yargsObject.value] })
            let output = {}
            let table = await readUser()
            for (let user of table) {
                output.id = user.id
                output.user = user.user
                console.log(output)
            }
        }
        
        else {
            console.log("Incorrect Command")
        }

        await sequelize.close()

    }
    
    catch (error) {
        console.log(error)
        await sequelize.close()
    }
}

app(yargs.argv)