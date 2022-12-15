import dbConnect from '../../../config/db';
import Student from "../../../models/studentModel"

dbConnect();

export default async (req, res) => {
    const { id } = req.query;
    
    switch(req.method){
        case 'GET':
        try {
        const student = await Student.findById(id)

        res.status(200).json({ success: true, data: student })
    } catch (error) {
        res.status(400).json({ success: false });
    } 
    break;
    case 'PUT':
            try {
                
                const student = await Student.findOneAndUpdate(
                    {_id:id},
                    {...req.body}
                )
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;   
    }
    
}