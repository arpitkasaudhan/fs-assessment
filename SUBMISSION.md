# Build Your Own Timer Challenge Submission

## Project Information
- **Name**: Arpit Kasaudhan
- **Email**: [kasaudhanarpit37@gmail.com]
- **Repository URL**: https://github.com/arpitkasaudhan/fs-assessment
- **Deployed Application URL**: 
  - Frontend: https://fs-assessment-psi.vercel.app/
  - Backend: https://dashboard.render.com/web/srv-ct3i5u2j1k6c73e8f7h0

## Implementation Details

### Tech Stack Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Render
- **Additional Libraries**: 
  - Axios
  - CORS
  - dotenv

### Database Schema
```javascript
const AssessmentSchema = new mongoose.Schema({
  assessment_start_time: {
    type: Date,
    required: true,
  },
  assessment_end_time: {
    type: Date,
    default: null,
  },
  total_duration: {
    type: Number, // Duration in milliseconds
    default: null,
  },
  fork_url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});
```

### Features Implemented
1. GitHub API integration to capture fork time
2. Digital stop clock display
3. Start time tracking from fork moment
4. End time recording
5. Total duration calculation
6. **Bonus Features**:
   - Pause and resume timer functionality

### AI Tools Used
| Tool | Purpose | Specific Contributions |
|------|---------|------------------------|
| Claude | Frontend UI Design | - Generated responsive React component layouts
- Provided guidance on component structure
- Assisted in creating styled timer interface
- Helped optimize UI/UX design |
| ChatGPT | README and Documentation | - Generated initial project README.md
- Helped structure project documentation
- Provided suggestions for code organization
- Assisted in creating comprehensive project description |

### Challenges Faced
1. GitHub token issues during API integration
2. Deployment complexities
3. Synchronizing frontend and backend timer logic



## Checklist
- [x] Backend API implemented
- [x] Frontend timer implemented
- [x] Database integration complete
- [x] Application deployed
- [x] Code documented
- [x] Screenshots attached
- [x] All times recorded

## Deployment Notes
- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB used for database storage