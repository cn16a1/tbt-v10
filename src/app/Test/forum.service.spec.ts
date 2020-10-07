import { HomeForumData } from './../modules/@core/mock/homeForumData';
import { JwtService } from './../modules/@core/services/jwt.service';
import { ApiService } from './../modules/@core/services/api.service';
import { ForumService } from './../modules/main/services/forum.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('Forum Service', () => {
    let apiService: ApiService;
    let jwtService: JwtService;
    let forumService: ForumService;
    let httpClientSpy: { get: jasmine.Spy };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule],
            providers: [ApiService, JwtService, ForumService]
        })
        // apiService = TestBed.get(ApiService);
        // http = TestBed.get(HttpClient);
        // jwtService = TestBed.get(JwtService);
    });

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        apiService = new ApiService(httpClientSpy as any, jwtService);
        forumService = new ForumService(apiService);
    });

    it("should be forumService created", () => {
        expect(forumService).toBeTruthy();
    });

    it("should return home-forum data and call HttpClient once", () => {
        let dummyHomeForum = HomeForumData
        httpClientSpy.get.and.returnValue(of(dummyHomeForum));
        forumService.getHomeForum().subscribe(homeForumData => {
            expect(homeForumData).toEqual(dummyHomeForum);
        })
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should return a Object', () => {
        let dummyPosts = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyPosts));
        forumService.getHomeForum().subscribe(posts => {
            expect(posts).toEqual({ code: dummyPosts.code, payload: dummyPosts.payload });
        })
    });
    
})