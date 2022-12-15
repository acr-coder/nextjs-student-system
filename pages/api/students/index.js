import dbConnect from '../../../config/db';
import Student from "../../../models/studentModel"

dbConnect();

export default async function handler (req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const students = await Student.find({});

                res.status(200).json({ success: true, data: students })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const student = await Student.create(req.body);
                console.log("post çalıştı");
                res.status(201).json({ success: true, data: student })
            } catch (error) {
                res.status(400).json({ success: false, data:error });
                console.log(error);
            }
            break;
        case 'DELETE':
            try {
                const student = await Student.findByIdAndDelete(req.body.id);
                //const student = await Student.deleteMany({_id: { $in: req.body.objects}});
                res.status(201).json({ success: true, data: student })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        
        default:
            res.status(400).json({ success: false });
            break;
    }
}