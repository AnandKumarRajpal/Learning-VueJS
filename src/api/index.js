
import fakeAPI from "@/lib/fakeAPI"

export const fetchActivities = function() {
    return fakeAPI.get('activities')
}

export const fetechCategories = function () 
{
    return fakeAPI.get('categories')
}

export const fetchUser = function ()
{
    return {
        name: 'Filip Jerga',
        id: '-Aj34jknvncx98812',
    }
}

export const generateUID = function()
{
    return Math.floor(new Date() * Math.random())
}

export const createActivityAPI = function (activity)
{
    activity.id = generateUID()
    activity.progress = 0
    activity.createdAt = new Date()
    activity.updatedAt = new Date()
    return fakeAPI.post('activities', activity)   
}

export const deleteActivityAPI = function (activity)
{
    return fakeAPI.delete('activities', activity)
}

